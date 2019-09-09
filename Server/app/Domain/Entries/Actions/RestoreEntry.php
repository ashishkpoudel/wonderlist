<?php

namespace App\Domain\Entries\Actions;

use App\Domain\Entries\Entry;

class RestoreEntry
{
    public function execute(Entry $entry): bool
    {
        return $entry->restore();
    }
}
