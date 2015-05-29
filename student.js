var student_array = [];

var student_object = {
    name: null,
    course: null,
    grade: null
};
var first_click = true;
var low_array_index = [];
var high_array_index = [];
var high_grade = -1;
var low_grade = 101;
var data_inputed = true;
var course_resp = $('#student_course').val();
var course_array = [];


//^^^^ Variables ^^^^
function add_student() {

        var addstudent = Object.create(student_object);
        addstudent.name = $('#student_name').val();
        addstudent.course = $('#student_course').val();
        addstudent.grade = parseFloat($('#student_grade').val());
        student_array.push(addstudent);
        //show_student();
        console.log(student_object);
        console.log(student_array);
        add_student_data();

        //v--------KC Added the Average function to this button


    }
    //got the show_student button to work we can also put it inside the add_student button by removing the comment before the show_student() function
function show_student() {

    console.log('button worked')


    average_grade();


    for (var i = 0; i < student_array.length; i++) {

        var output_stud = $('<div>', {
            class: "student_container list-group",
            data_index: i
        });
        var name_o = $('<div>', {
            class: "st_name list-group-item",
            text: student_array[i].name
        });
        var course_o = $('<div>', {
            class: "st_course list-group-item",
            text: student_array[i].course
        });

        var grade_o = $('<div>', {
            class: "st_grade list-group-item",
            text: student_array[i].grade
        });
        var delete_o = $('<button>', {
            class: "delete list-group-item",
            type: "button",
            text: "delete"
        });
        output_stud.on('click', function() {
            var index = $(this).attr('data_index');
            $(this).remove();
            student_array.splice(index, 1)
            show_student()

        })
        $('#student_object').append(output_stud);
        $(output_stud).append(name_o, course_o, grade_o, delete_o);

    }
    high_low_grade();
    highlight_high();
    highlight_low();


};





function average_grade() {
    var sum = 0;
    var average = 0;
    console.log(student_object);
    console.log(student_array);
    for (var i = 0; i < student_array.length; i++) {
        sum += parseFloat(student_array[i].grade);

    }
    average = sum / student_array.length;
    console.log('Average: ', average);
    $('#student_display').val(average.toFixed(0));
}

function high_low_grade() {
    high_array_index = [];
    low_array_index = [];
    high_grade = parseFloat(student_array[0].grade);
    low_grade = parseFloat(student_array[0].grade);
    for (var i = 0; i < student_array.length; i++) {
        if (student_array[i].grade == high_grade) {
            high_array_index.push(i);
        }
        if (parseFloat(student_array[i].grade) > high_grade) {
            high_array_index = [i];
            high_grade = student_array[i].grade;
        }
        if (student_array[i].grade == low_grade) {
            low_array_index.push(i);
        }

        if (parseFloat(student_array[i].grade) < low_grade) {
            low_array_index = [i];
            low_grade = student_array[i].grade;
        }
    }
}

function highlight_low() {

    for (var i = 0; i < low_array_index.length; i++) {

        $('.st_grade').eq(low_array_index[i]).addClass('low')
        console.log('low_array:', low_array_index)
    }
}

function highlight_high() {
    for (var i = 0; i < high_array_index.length; i++) {

        $('.st_grade').eq(high_array_index[i]).addClass('high')
        console.log('high_array:', high_array_index)


    }


}

function footer() {
    $('.footer').append('<p class="col-sm-3 col-md-3 col-md-offset-2">Pink = Highest Grade in the class.</p>')
        .append('<p class="col-sm-3 col-md-3 col-md-offset-2">Blue = Lowest Grade in the class.</p>')
}


function get_student_data() {
    $.ajax({
        dataType: 'json',
        url: 'http://s-apis.learningfuze.com/sgt/get',
        success: function(response) {
            result = response;
            console.log('Students added from server', result)
            student_array = [];
            student_array = student_array.concat(result.data)
            console.log(student_array)

        }

    })
}

function add_student_data() {
    $.ajax({
        dataType: 'html',
        method: 'POST',
        data: {
            name: student_array[0].name,
            course: student_array[0].course,
            grade: student_array[0].grade
        },
        cache: false,
        crossDomain: true,
        url: 'http://s-apis.learningfuze.com/sgt/create/',
        success: function(response) {
            if (response) {
                console.log('student sent to server', student_array[student_array.length - 1])
                get_student_data();
            }
        }
    })
}


function sort_grades() {
    console.log('sort grades function:', student_array);
    for (var i = 1; i < student_array.length; i++) {

        if (student_array[i].grade < student_array[i - 1].grade) {
            var less = student_array[i];
            student_array[i] = student_array[i - 1];
            student_array[i - 1] = less;
            i = 0;
        }
    }

}


function sort_course() {
    console.log('sort course function:', student_array);
    for (var i = 1; i < student_array.length; i++) {

        if (student_array[i].course < student_array[i - 1].course) {
            var less = student_array[i];
            student_array[i] = student_array[i - 1];
            student_array[i - 1] = less;
            i = 0;
        }
    }

}

function sort_names() {
    console.log('sort names function:', student_array);
    for (var i = 1; i < student_array.length; i++) {

        if (student_array[i].name < student_array[i - 1].name) {
            var less = student_array[i];
            student_array[i] = student_array[i - 1];
            student_array[i - 1] = less;
            i = 0;
        }
    }

}
function populate_input (this_div){
    $('#student_course').val($(this_div).text());
}
function get_server() {
    $.ajax({
        dataType: 'json',
        method: 'GET',
        cache: false,
        crossDomain: true,
        url: 'http://s-apis.learningfuze.com/sgt/courses',
        success: function(response) {
            var div = $('<div>', {
                class: "course_container",
            });
            var ul = $('<ul>', {
                class: 'list_group'
            });
            course_resp = $('#student_course').val();
            console.log('get_server():', response.data[0].course)
            console.log('input', course_resp.length)
            for (var i = 0; i < response.data.length; i++) {
                if (response.data[i].course.substr(0, course_resp.length) == course_resp) {
                    course_array.push(response.data[i].course)
                }
            }
            for (var i = 0; i < 4; i++) {
                var input = $('<li>', {
                    class: 'list_item',
                    text: course_array[i]
                });


                $(ul).append(input);

            }

            $(div).append(ul);
            $('.student_course').append(div);
        }

    })

}

//^^^^ Functions ^^^^
$(document).ready(function() {
    footer();
    $('body').on('click', '#add_btn', function() {
        add_student();

    });
    $('body').on('click', '#show_btn', function() {
        console.log('show button works')
        $('#student_object').html('');
        show_student();
    });
    $('body').on('click', '#update', function() {
        console.log('update button works')

        get_student_data();
    });
    $('body').on('click', '#sort_grade', function() {
        $('#student_object').html('');
        sort_grades();
        show_student();
        high_low_grade();
        highlight_high();
        highlight_low();
    });
    $('body').on('click', '#sort_course', function() {
        $('#student_object').html('');
        sort_course();
        show_student();
        high_low_grade();
        highlight_high();
        highlight_low();
    });
    $('body').on('click', '#sort_name', function() {
        $('#student_object').html('');
        sort_names();
        show_student();
        high_low_grade();
        highlight_high();
        highlight_low();


    });
    $('body').on('touchstart', '#add_btn', function() {
        add_student();

    });
    $('body').on('touchstart', '#show_btn', function() {
        console.log('show button works')
        $('#student_object').html('');
        show_student();
    });
    $('body').on('touchstart', '#update', function() {
        console.log('update button works')

        get_student_data();
    });
    $('body').on('touchstart', '#sort_grade', function() {
        $('#student_object').html('');
        sort_grades();
        show_student();
        high_low_grade();
        highlight_high();
        highlight_low();
    });
    $('body').on('touchstart', '#sort_course', function() {
        $('#student_object').html('');
        sort_course();
        show_student();
        high_low_grade();
        highlight_high();
        highlight_low();
    });
    $('body').on('touchstart', '#sort_name', function() {
        $('#student_object').html('');
        sort_names();
        show_student();
        high_low_grade();
        highlight_high();
        highlight_low();


    });
    $("body").keyup(function(event) {
        get_server();

        console.log("Key: " + event.which);
    });

$('.student_course').on('click', '.list_item', function(){
    populate_input(this);
})
    //setInterval('get_student_data()', 5000);
});
//^^document.ready^^
