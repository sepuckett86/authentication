<?php

namespace App\Api\V1\Requests;

use Config;
use Dingo\Api\Http\FormRequest;

class AdminContactRequest extends FormRequest
{
    public function rules()
    {
        return Config::get('boilerplate.contact_admin.validation_rules');
    }

    public function authorize()
    {
        return true;
    }
}
