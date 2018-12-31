<div>
    Hi, Goodminder!

    The following form was submitted to you:
    <table border=10px>
        <tr>
            <th>key</th>
            <th>property</th>
        </tr>
        <tr>
            <td>firstName</td>
            <td>{{ $sentInfo['firstName'] }}</td>
        </tr>
        <tr>
            <td>lastName</td>
            <td>{{ $sentInfo['lastName'] }}</td>
        </tr>
        <tr>
            <td>email</td>
            <td>{{ $sentInfo['email'] }}</td>
        </tr>
        <tr>
            <td>comment</td>
            <td>{{ $sentInfo['comment'] }}</td>
        </tr>
    </table>
</div>
