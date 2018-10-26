<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Gminder extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'mainResponse'
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
