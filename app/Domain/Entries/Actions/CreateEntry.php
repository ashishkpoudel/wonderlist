<?php

namespace App\Domain\Entries\Actions;

use App\Domain\Users\User;
use App\Domain\Entries\{DTO\EntryData, Entry};

class CreateEntry
{
    public function execute(EntryData $entryData): Entry
    {
        $entry = new Entry;
        $entry->title = $entryData->title;
        $entry->body = $entryData->body;
        $entry->user()->associate($entryData->user);
        $entry->save();

        return $entry;
    }
}
