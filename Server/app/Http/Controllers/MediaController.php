<?php

namespace App\Http\Controllers;

use App\Domain\Media\Actions\DeleteMedia;
use App\Domain\Media\Policies\AuthMediaPolicy;
use App\Http\Requests\MediaRequest;
use App\Http\Resources\MediaResource;
use App\Domain\Media\Actions\CreateMedia;
use App\Domain\Media\Media;

class MediaController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only(
            'store',
            'delete'
        );
    }

    public function store(MediaRequest $request, CreateMedia $createMedia)
    {
        $media = $createMedia->execute($request->mediaData());

        return MediaResource::make($media);
    }

    public function delete($id, DeleteMedia $deleteMedia)
    {
        $media = Media::findOrFail($id);

        $this->authorize(AuthMediaPolicy::DELETE, $media);

        $deleteMedia->execute($media);

        return response([], 204);
    }
}

