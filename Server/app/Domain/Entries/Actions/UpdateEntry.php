<?php

namespace App\Domain\Entries\Actions;

use App\Domain\Entries\{DTO\EntryData, Models\Entry};

class UpdateEntry
{
    public function execute(Entry $entry, EntryData $entryData): Entry
    {
        $entry->title = $entryData->title;
        $entry->body = $entryData->body;
        $entry->save();

        return $entry;
    }
}
