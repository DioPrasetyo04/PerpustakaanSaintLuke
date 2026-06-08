<?php

use App\Exceptions\BusinessException;
use App\Http\Middleware\DynamicRoleAndPermissionMiddleware;
use App\Http\Middleware\EnsureUserHasActiveLoan;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Exceptions\UnauthorizedException as SpatieUnauthorizedException;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {

        $middleware->trustProxies(at: '*');

        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->validateCsrfTokens(except: [
            'payments/*',
        ]);

        $middleware->alias(aliases: [
            'role' => RoleMiddleware::class,
            'permission' => PermissionMiddleware::class,
            'dynamic.role_permission' => DynamicRoleAndPermissionMiddleware::class,
            'ensure.loan' => EnsureUserHasActiveLoan::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->render(function (BusinessException $e, Request $request) {
            if ($request->header('X-Inertia')) {
                return back()->withErrors([
                    'business' => $e->getMessage(),
                ])->with('businessError', [
                    'message' => $e->getMessage(),
                    'context' => $e->context(),
                ]);
            }

            return response()->json([
                'message' => $e->getMessage(),
                'context' => $e->context(),
            ], $e->status());
        });

        // Halaman error kustom (Inertia) untuk respons HTML pada status umum.
        // Tidak aktif saat debug menyala (agar developer tetap melihat detail
        // error) maupun untuk permintaan yang mengharapkan JSON/API.
        $exceptions->respond(function (Response $response, Throwable $e, Request $request) {
            $status = $response->getStatusCode();

            if (
                ! app()->hasDebugModeEnabled()
                && ! $request->expectsJson()
                && in_array($status, [400, 401, 403, 404, 419, 429, 500, 503], true)
            ) {
                return Inertia::render('Error', ['status' => $status])
                    ->toResponse($request)
                    ->setStatusCode($status);
            }

            return $response;
        });
    })->create();
