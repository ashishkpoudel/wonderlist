<?php

namespace App\Domain\Entries\Actions;

use App\Domain\Entries\Models\Entry;

class DeleteEntry
{
    public function execute(Entry $entry): bool
    {
        if ($entry->trashed()) {
            return $entry->forceDelete();
        }

        return $entry->delete();
    }
}
