//alert("AJAX is connected!");

$('#new_form').submit(function (e) {
    e.preventDefault();
    console.log(e);
    var toDoItem = $(this).serialize();
    console.log('your todo: ', toDoItem);
    $.post('/todos', toDoItem, (data)=> {
        $("#todos").append(
            `
            <li class="list-group-item">
                <span class="lead">
                    ${data.text}
                </span>
                <div class="pull-right">
                    <a href="/todos/${data._id}/edit" class="btn btn-sm btn-warning">Edit</a>
                    <form style="display: inline" action="/todos/${data._id}?_method=DELETE" method="POST">
                        <button class="btn btn-sm btn-danger">Done</button>
                    </form>
                </div>
                <div class="clearfix"></div>
            </li>
            `
        )
    });
})