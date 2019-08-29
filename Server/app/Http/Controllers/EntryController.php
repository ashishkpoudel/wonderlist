<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EntryRequest;
use App\Http\Resources\EntryResource;
use App\Domain\Entries\AuthPolicies\EntryPolicy;
use App\Domain\Entries\Actions\{CreateEntry, UpdateEntry, DeleteEntry};
use App\Domain\Entries\Entry;

class EntryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api')->only(
            'index', 'store', 'show', 'update', 'delete'
        );
    }

    public function index()
    {
        $entries = Entry::latest()->user(auth()->user())->paginate(5);

        return EntryResource::collection($entries);
    }

    public function store(EntryRequest $request, CreateEntry $createEntry)
    {
        $this->authorize(EntryPolicy::CREATE, Entry::class);

        $entry = $createEntry->execute($request->entryData());

        return EntryResource::make($entry);
    }

    public function show($id)
    {
        $entry = Entry::findOrFail($id);

        $this->authorize(EntryPolicy::VIEW, $entry);

        return EntryResource::make($entry);
    }

    public function update($id, EntryRequest $request, UpdateEntry $updateEntry)
    {
        $entry = Entry::findOrFail($id);

        $this->authorize(EntryPolicy::UPDATE, $entry);

        $updatedEntry = $updateEntry->execute($entry, $request->entryData());

        return EntryResource::make($updatedEntry);
    }

    public function delete($id, DeleteEntry $deleteEntry)
    {
        $entry = Entry::findOrFail($id);

        $this->authorize(EntryPolicy::DELETE, $entry);

        $deleteEntry->execute($entry);

        return response(null, 204);
    }
}
