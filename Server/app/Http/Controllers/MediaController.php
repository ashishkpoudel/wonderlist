<?php

namespace App\Http\Controllers;

use App\Http\Requests\MediaRequest;
use App\Http\Resources\MediaResource;
use App\Domain\Media\Actions\CreateMedia;

class MediaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only('store');
    }

    public function store(MediaRequest $request, CreateMedia $createMedia)
    {
        $media = $createMedia->execute($request->mediaData());

        return MediaResource::make($media);
    }
}
