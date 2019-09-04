<?php

namespace Tests\Feature;

use App\Domain\Media\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MediaTest extends TestCase
{
    use RefreshDatabase;

    private function postMedia(UploadedFile $file)
    {
        return $this->postJson(route('media.store'), [
            'file' => $file,
            'subject_id' => '1',
            'subject_type' => 'entries',
            'category' => 'photos',
        ]);
    }

    /** @test */
    public function guest_cannot_upload_media()
    {
        $this->postJson(route('media.store'), [])
            ->assertStatus(401);
    }

    /** @test */
    public function user_can_upload_media()
    {
        $this->signIn();

        Storage::fake('public');

        $file = UploadedFile::fake()->image('example.jpg');

        $response = $this->postMedia($file);

        $response->assertJsonStructure([
            'data' => [
                'path',
                'relative_path',
                'mime_type',
                'extension',
                'size',
                'category'
            ]
        ]);

        $response->assertStatus(201);

        Storage::disk('public')->assertExists('media/' . $file->hashName());
    }

    /** @test */
    public function user_can_delete_media()
    {
        $this->signIn();

        Storage::fake('public');

        $this->postMedia(UploadedFile::fake()->image('example.jpg'));

        $this->deleteJson(route('media.delete', Media::query()->first()->id))
            ->assertStatus(204);

        $this->assertCount(0, Storage::disk('public')->allFiles());
    }
}
