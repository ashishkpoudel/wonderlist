<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Faker\Generator as Faker;
use Illuminate\Http\UploadedFile;
use App\Domain\Media\Models\Media;
use App\Domain\Accounts\Models\User;

$factory->define(Media::class, function (Faker $faker) {
    $file = UploadedFile::fake()->image('example.jpg');
    return [
        'relative_path' => $file->getPath(),
        'mime_type' => $file->getMimeType(),
        'extension' => $file->getExtension(),
        'size' => $file->getSize(),
        'subject_id' => 'entries',
        'subject_type' => '1',
        'category' => 'photos'
    ];
});

$factory->state(Media::class, 'with_user', function () {
   return [
       'user_id' => factory(User::class)->create()
   ];
});
