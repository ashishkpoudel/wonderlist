<?php

namespace App\Http\Controllers;

use App\Http\Requests\TagRequest;
use App\Http\Resources\TagResource;
use App\Domain\Tags\Actions\CreateTag;
use App\Domain\Tags\Actions\DeleteTag;
use App\Domain\Tags\Actions\UpdateTag;
use App\Domain\Tags\Models\Tag;
use App\Domain\Tags\Policies\AuthTagPolicy;

class TagController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api'])->only(
            'index',
            'store',
            'update',
            'delete'
        );
    }

    public function index()
    {
        $tags = Tag::latest()->ofUser(auth()->user());

        return TagResource::collection($tags->paginate());
    }

    public function store(TagRequest $tagRequest, CreateTag $createTag)
    {
        $this->authorize(AuthTagPolicy::CREATE, Tag::class);

        $tag = $createTag->execute($tagRequest->tagData());

        return TagResource::make($tag);
    }

    public function update($id, TagRequest $tagRequest, UpdateTag $updateTag)
    {
        $tag = Tag::findOrFail($id);

        $this->authorize(AuthTagPolicy::UPDATE, $tag);

        $updatedTag = $updateTag->execute($tag, $tagRequest->tagData());

        return TagResource::make($updatedTag);
    }

    public function delete($id, DeleteTag $deleteTag)
    {
        $tag = Tag::findOrFail($id);

        $this->authorize(AuthTagPolicy::DELETE, $tag);

        $deleteTag->execute($tag);

        return response(null, 204);
    }
}
