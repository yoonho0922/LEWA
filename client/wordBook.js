FlowRouter.template('/wordBook', 'wordBook');

Template.wordBook.helpers({
    words1: function () {

        var words_list1 = new Array();

        // words_list.push(DB_WORDS.findOne({user_id: Meteor.user()._id}));

        var listed1 = DB_WORDS.findAll({user_id: Meteor.user()._id,form:1});
        listed1.forEach(function (element) {
            words_list1.push(DB_WORDS.findOne({word: element.word}));
        });
        return words_list1;
    },
    words2: function () {

        var words_list2 = new Array();

        // words_list.push(DB_WORDS.findOne({user_id: Meteor.user()._id}));

        var listed2 = DB_WORDS.findAll({user_id: Meteor.user()._id,form:2});
        listed2.forEach(function (element) {
            words_list2.push(DB_WORDS.findOne({word: element.word}));
        });
        return words_list2;
    },
    titles:function (title) {
        return DB_ALL_ARTICLES.findOne({_id:title}).title;
    },
    math: function(lvalue, operator, rvalue) { //index 1부터 시작하게 도와주는 함수
        lvalue = parseInt(lvalue);
        rvalue = parseInt(rvalue);

        return { "+": lvalue + rvalue, "/": lvalue / rvalue }[operator];
    },
})


//
// (function(){
//     'use strict';
//     var $ = jQuery;
//     $.fn.extend({
//         filterTable: function(){
//             return this.each(function(){
//                 $(this).on('keyup', function(e){
//                     $('.filterTable_no_results').remove();
//                     var $this = $(this),
//                         search = $this.val().toLowerCase(),
//                         target = $this.attr('data-filters'),
//                         $target = $(target),
//                         $rows = $target.find('tbody tr');
//
//                     if(search == '') {
//                         $rows.show();
//                     } else {
//                         $rows.each(function(){
//                             var $this = $(this);
//                             $this.text().toLowerCase().indexOf(search) === -1 ? $this.hide() : $this.show();
//                         })
//                         if($target.find('tbody tr:visible').size() === 0) {
//                             var col_count = $target.find('tr').first().find('td').size();
//                             var no_results = $('<tr class="filterTable_no_results"><td colspan="'+col_count+'">No results found</td></tr>')
//                             $target.find('tbody').append(no_results);
//                         }
//                     }
//                 });
//             });
//         }
//     });
//     $('[data-action="filter"]').filterTable();
// })(jQuery);
//
// $(function(){
//     // attach table filter plugin to inputs
//     $('[data-action="filter"]').filterTable();
//
//     $('.container').on('click', '.panel-heading span.filter', function(e){
//         var $this = $(this),
//             $panel = $this.parents('.panel');
//
//         $panel.find('.panel-body').slideToggle();
//         if($this.css('display') != 'none') {
//             $panel.find('.panel-body input').focus();
//         }
//     });
//     $('[data-toggle="tooltip"]').tooltip();
// })