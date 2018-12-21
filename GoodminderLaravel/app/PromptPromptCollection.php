<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;

class PromptPromptCollection extends Pivot
{
    public function prompt()
    {
        return $this->belongsTo('App\Prompt');
    }

    public function promptCollection()
    {
        return $this->belongsTo('App\PromptCollection');
    }
}
