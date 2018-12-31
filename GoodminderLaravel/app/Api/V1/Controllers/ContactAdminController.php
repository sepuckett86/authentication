<?php

namespace App\Api\V1\Controllers;

use App\Http\Controllers\Controller;
use App\Api\V1\Requests\AdminContactRequest;
use App\AdminContact;

class ContactAdminController extends Controller
{

    /*
    * Save firstName, lastName, email, and comment into admin_contacts table.
    * Send the information to email as well.
    */
    public function sendInfo(AdminContactRequest $request)
    {
        $adminContact = new AdminContact;

        if ($request->get('firstName') !== null) {
            $adminContact->firstName = $request->get('firstName');
        }
        if ($request->get('lastName') !== null) {
            $adminContact->lastName = $request->get('lastName');
        }
        if ($request->get('email') !== null) {
            $adminContact->email = $request->get('email');
        }
        if ($request->get('comment') !== null) {
            $adminContact->comment = $request->get('comment');
        }
                
        if ($adminContact->save()) {
            return 'Contact info saved.';
        } else {
            return 'Contact info save failed.';
        }
    }
}
