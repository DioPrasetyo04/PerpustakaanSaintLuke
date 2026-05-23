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
            return response()->json([
                'message' => $e->getMessage(),
                'context' => $e->context(),
            ], $e->status());
        });
    })->create();
