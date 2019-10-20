<?php

namespace Tests\Feature;

use App\Domain\Tags\Models\Tag;
use App\Domain\Accounts\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TagTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_create_tag()
    {
        $this->signIn();

        $tagData = factory(Tag::class)->make()->toArray();

        $this->postJson(route('tags.store'), $tagData)
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'id'
                ]
            ]);

        $this->assertDatabaseHas(Tag::TABLE, $tagData);
    }

    /** @test */
    public function user_can_update_their_tag()
    {
        $tag = factory(Tag::class)->states('with_user')->create();
        $tagData = factory(Tag::class)->make()->toArray();

        $this->signIn($tag->user);

        $this->patchJson(route('tags.update', $tag->id), $tagData)
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    'id'
                ]
            ]);

        $this->assertDatabaseHas(Tag::TABLE, $tagData);
    }

    /** @test */
    public function user_can_delete_their_tag()
    {
        $tag = factory(Tag::class)->states('with_user')->create();

        $this->signIn($tag->user);

        $this->deleteJson(route('tags.delete', $tag->id))
            ->assertStatus(204);

        $this->assertDatabaseMissing(Tag::TABLE, ['id' => $tag->id]);
    }

    /** @test */
    public function user_can_list_their_tags()
    {
        $user = factory(User::class)->create();
        $tags = factory(Tag::class, 10)->create(['user_id' => $user->id]);

        $this->signIn($user);

        $this->getJson(route('tags.index'))
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    [
                        'id',
                        'name'
                    ]
                ]
            ]);
    }

}
