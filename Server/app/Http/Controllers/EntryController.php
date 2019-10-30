<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EntryRequest;
use App\Http\Resources\EntryResource;
use App\Domain\Entries\Policies\AuthEntryPolicy;
use App\Domain\Entries\Actions\{CreateEntry, UpdateEntry, DeleteEntry, RestoreEntry};
use App\Domain\Entries\Models\Entry;

class EntryController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api'])->only(
            'index', 'store', 'show', 'update', 'delete', 'restore'
        );
    }

    public function index(Request $request)
    {
        $entries = Entry::query()->latest()->ofUser(auth()->user());

        if ($request->has('filter.trashed')) {
            $entries->onlyTrashed();
        }

        return EntryResource::collection($entries->paginate(5));
    }

    public function store(EntryRequest $request, CreateEntry $createEntry)
    {
        $this->authorize(AuthEntryPolicy::CREATE, Entry::class);

        $entry = $createEntry->execute($request->entryData());

        return EntryResource::make($entry);
    }

    public function show($id)
    {
        $entry = Entry::findOrFail($id);

        $this->authorize(AuthEntryPolicy::VIEW, $entry);

        return EntryResource::make($entry);
    }

    public function update($id, EntryRequest $request, UpdateEntry $updateEntry)
    {
        $entry = Entry::findOrFail($id);

        $this->authorize(AuthEntryPolicy::UPDATE, $entry);

        $updatedEntry = $updateEntry->execute($entry, $request->entryData());

        return EntryResource::make($updatedEntry);
    }

    public function delete($id, DeleteEntry $deleteEntry)
    {
        $entry = Entry::withTrashed()->findOrFail($id)->first();

        $this->authorize(AuthEntryPolicy::DELETE, $entry);

        $deleteEntry->execute($entry);

        return response(null, 204);
    }

    public function restore($id, RestoreEntry $restoreEntry)
    {
        $entry = Entry::withTrashed()->findOrFail($id)->first();

        $this->authorize(AuthEntryPolicy::RESTORE, $entry);

        $restoreEntry->execute($entry);

        return response(null, 204);
    }
}
