<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EntryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'body' => $this->body,
            'user' => $this->whenLoaded('user', function(){ return UserResource::make($this->user); }),
            'trashed' => $this->trashed(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
