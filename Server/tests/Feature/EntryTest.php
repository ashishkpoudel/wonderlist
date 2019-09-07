<?php

namespace Tests\Feature;

use App\Domain\Entries\Entry;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EntryTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_cannot_create_a_entry()
    {
        $this->postJson(route('entries.store'))
            ->assertStatus(401);
    }

    /** @test */
    public function user_can_create_entry()
    {
        $this->signIn();

        $entryData = factory(Entry::class)->make()->toArray();

        $this->postJson(route('entries.store'), $entryData)
            ->assertStatus(201);

        $this->assertDatabaseHas(Entry::TABLE, [
           'title' => $entryData['title'],
           'body' => $entryData['body']
        ]);
    }

    /** @test */
    public function user_can_update_their_entry()
    {
        $entry = factory(Entry::class)->states('with_user')->create();
        $entryData = factory(Entry::class)->make()->toArray();

        $this->signIn($entry->user);

        $this->patchJson(route('entries.update', $entry->id), $entryData)
            ->assertStatus(200);

        $this->assertDatabaseHas(Entry::TABLE, [
            'title' => $entryData['title'],
            'body' => $entryData['body']
        ]);
    }

    /** @test */
    public function user_cannot_delete_entry_which_dont_belong_to_them()
    {
        $this->signIn();

        $entry = factory(Entry::class)->states('with_user')->create();

        $this->deleteJson(route('entries.delete', $entry->id))
            ->assertStatus(403);
    }

    /** @test */
    public function user_can_delete_their_entry()
    {
        $entry = factory(Entry::class)->states('with_user')->create();

        $this->signIn($entry->user);

        $this->deleteJson(route('entries.delete', $entry->id))
            ->assertStatus(204);

        $this->assertNotNull($entry->fresh()->deleted_at);
    }

}
