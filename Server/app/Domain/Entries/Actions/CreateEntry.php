<?php

namespace App\Domain\Entries\Actions;

use App\Domain\Entries\{DTO\EntryData, Models\Entry};

class CreateEntry
{
    public function execute(EntryData $entryData): Entry
    {
        $entry = new Entry;
        $entry->title = $entryData->title;
        $entry->body = $entryData->body;
        $entry->user()->associate($entryData->user);
        $entry->media()->saveMany($entryData->medias);
        $entry->save();

        return $entry;
    }
}
