<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class storedPrompt extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'creator_id', 'promptCollection', 'displayFlag'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
