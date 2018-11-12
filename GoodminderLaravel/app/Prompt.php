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
        'user_id', 'collection', 'promptText', 'publicFlag'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
