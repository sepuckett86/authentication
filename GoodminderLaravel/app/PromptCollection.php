<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PromptCollection extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'creator_id', 'collection', 'publicFlag', 'description'
    ];

    public function prompts()
    {
        return $this->belongsToMany('App\Prompt')->withTimestamps();
    }
}

