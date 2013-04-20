/*!
 * Example plugin using JQuery Terminal Emulator
 * Copyright (C) 2010 Jakub Jankiewicz <http://jcubic.pl> 
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function($) {
    $.extend_if_has = function(desc, source, array) {
        for (var i=array.length;i--;) {
            if (typeof source[array[i]] != 'undefined') {
                desc[array[i]] = source[array[i]];
            }
        }
        return desc;
    };
    $.fn.dterm = function(eval, options) {
        var op = $.extend_if_has({}, options, 
                                   ['greetings', 'prompt', 'login',
                                    'name', 'cookie', 'exit']);
        op.enabled = false;
        var terminal = this.append('<div></div>').terminal(eval, op);
        if (!options.title) {
            options.title = 'JQuery Terminal Emulator';
        }
        if (options.logoutOnClose) {
            options.close = function(e, ui) {
                terminal.logout();
                terminal.clear();
            };
        } else {
            options.close = function(e, ui) {
                terminal.focus(false);
            };
        }
        var self = this;
        var dialog = this.dialog($.extend(options, {
            resize: function(e, ui) {
                var content = self.find('.ui-dialog-content');
                terminal.resize(content.width(), content.height());
            },
            open: function(e, ui) {
                terminal.focus();
            },
            show: 'fade',
            closeOnEscape: false
        }));
        this.terminal = terminal;
        return this;
    };
})(jQuery);
