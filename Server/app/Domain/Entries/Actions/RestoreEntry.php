<?php

namespace App\Domain\Entries\Actions;

use App\Domain\Entries\Models\Entry;

class RestoreEntry
{
    public function execute(Entry $entry): bool
    {
        return $entry->restore();
    }
}
