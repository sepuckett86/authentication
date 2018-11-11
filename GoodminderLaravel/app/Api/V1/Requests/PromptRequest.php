<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class PromptRequest extends FormRequest
{
    public function rules()
    {
        return Config::get('boilerplate.prompt_request');
    }

    public function authorize()
    {
        return true;
    }
}
