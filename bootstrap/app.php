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
use Inertia\Inertia;
use Spatie\Permission\Exceptions\UnauthorizedException as SpatieUnauthorizedException;
use Spatie\Permission\Middleware\PermissionMiddleware;
use Spatie\Permission\Middleware\RoleMiddleware;
use Symfony\Component\HttpKernel\Exception\HttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {

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

        // handle custom notification Handler bussines logic
        $exceptions->render(function (BusinessException $e, $request) {
            return redirect()->back()->with([
                'error_key' => $e->getMessage(),
            ]);
        });

        // ❌ 404 - Not Found
        $exceptions->render(function (ModelNotFoundException $e, $request) {
            return Inertia::render('Notification/Page404')->toResponse($request)->setStatusCode(404);
        });

        // ❌ 403 - Forbidden / Unauthorized
        $exceptions->render(function ($e, $request) {
            if (
                $e instanceof AuthorizationException ||
                $e instanceof SpatieUnauthorizedException
            ) {
                return Inertia::render('Notification/Page403')
                    ->toResponse($request)
                    ->setStatusCode(403);
            }
        });

        // ❌ 401 - Not Authenticated
        $exceptions->render(function (AuthenticationException $e, $request) {
            return redirect()->route('login');
        });

        // ❌ 500 - Server Error
        $exceptions->render(function (HttpException $e, $request) {
            return Inertia::render('Notification/Page500')
                ->toResponse($request)
                ->setStatusCode($e->getStatusCode());
        });
    })->create();
