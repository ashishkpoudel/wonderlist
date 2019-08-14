<?php

namespace App\Domain\Entries\Actions;

use App\Domain\Entries\Entry;

class DeleteEntry
{
    public function execute(Entry $entry): bool
    {
        return $entry->delete();
    }
}
