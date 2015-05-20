var student_array = [];

var student_object = {
    name: null,
    course: null,
    grade: null
};
var first_click = true;
var low_array = [];
var high_array = [];

function add_student() {

        var addstudent = Object.create(student_object);
        addstudent.s_name = $('#student_name').val();
        addstudent.s_course = $('#student_course').val();
        addstudent.s_grade = parseFloat($('#student_grade').val());
        student_array.push(addstudent);
        //show_student();
        console.log(student_object);
        console.log(student_array);
        average_grade();
        //v--------KC Added the Average function to this button
        

    }
    //got the show_student button to work we can also put it inside the add_student button by removing the comment before the show_student() function
function show_student() {

    console.log('button worked')
    


 footer();

    for (var i = 0; i < student_array.length; i++) {
        var output_stud = $('<div>', {
            class: "student_container list-group",
            data_index: i
        });
        var name_o = $('<div>', {
            class: "st_name list-group-item",
            text: student_array[i].s_name
        });
        var course_o = $('<div>', {
            class: "st_course list-group-item",
            text: student_array[i].s_course
        });
        var grade_o = $('<div>', {
            class: "st_grade list-group-item",
            text: student_array[i].s_grade
        });
        var delete_o = $('<button>', {
            class: "delete list-group-item",
            type: "button",
            text: "delete"
        });
        output_stud.on('click',function (){
            var index = $(this).attr('data_index');
            $(this).remove();
            student_array.splice(index,1);
            high_low_grade();
            highlight_low();
            highlight_high();
        })
        $('#student_object').append(output_stud);
        $(output_stud).append(name_o, course_o, grade_o, delete_o);

    }

};



$(document).ready(function() {
    $('.s_add').on('click', add_student);


});

function average_grade() 
{
    var sum = 0;
    var average = 0;
    console.log(student_object);
    console.log(student_array);
    for (var i = 0; i < student_array.length; i++) 
        {
            sum += student_array[i].s_grade;

        }   
    average = sum / student_array.length;
    console.log('Average: ',average);
    $('#student_display').val(average.toFixed(0));
}

function high_low_grade() 
{   
   
    var high_grade = student_array[0].s_grade;
    var low_grade = student_array[0].s_grade;
    var min = 0;
    var max = 0;
    for (var i = 0; i < student_array.length; i++) 
    {
        if (student_array[i].s_grade == high_grade)
        {
             high_array.push(i);
        }
        if (student_array[i].s_grade > high_grade)
        {
            high_array = [i];
            high_grade = student_array[i].s_grade;
        }
        if (student_array[i].s_grade == low_grade)
        {
             low_array.push(i);
        }
        if (student_array[i].s_grade < low_grade)
        {
            low_array = [i];
            low_grade = student_array[i].s_grade;
        }
    }
}
function highlight_low (){
    
    for (var i = 0; i < low_array.length; i++){
        $('.st_grade').eq(low_array[i]).addClass('low')
        console.log('low')
    }
}
function highlight_high (){
    for (var i = 0; i < high_array.length; i++) {
    $('.st_grade').eq(high_array[i]).addClass('high')
    console.log('high')
   
   
    }


}
function footer () {
     $('.footer').append('<p class="col-sm-3 col-md-3">Pink = Highest Grade in the class.</p>')
         .append('<p class="col-sm-3 col-md-3">Blue = Lowest Grade in the class.</p>')
}
