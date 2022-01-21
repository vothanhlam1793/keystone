const {
    File,
    Text,
    Slug,
    Relationship,
    Select,
    Password,
    Checkbox,
    CalendarDay,
    DateTime,
    Integer,
  //   Wysiwyg
  } = require('@keystonejs/fields');
  const { Wysiwyg } = require('@keystonejs/fields-wysiwyg-tinymce');
  const { permission, rules, isSignedIn } = require("./../access");
  module.exports = {
        fields: {
            title: {
                type: Text
            },
            content: {
                type: Wysiwyg
            },
            startDate: {
                type: CalendarDay,
            },
            endDate: {
                type: CalendarDay,
            },
            notSeen: {
                type: Relationship,
                ref: "User",
                many: true
            }
        },
        access: {
            create: permission.canManagePopUp,
            delete: permission.canManagePopUp,
            update: permission.canManagePopUp
        }
  }