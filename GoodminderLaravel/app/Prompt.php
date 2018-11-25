<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Prompt extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'creator_id', 'creatorDeleted', 'promptText'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

    public function prompt_collections()
    {
        return $this->belongsToMany('App\PromptCollection')->withTimestamps();
    }
}
