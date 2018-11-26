<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StoredPromptCollection extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'prompt_collection_id', 'displayFlag'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
