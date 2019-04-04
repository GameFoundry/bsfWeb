(function() {
    'use strict';
  
    var url_re = /docs\.bsframework\.io\/(nightly|latest|(v\d\.\d+))\//;
    var all_versions = {
      'nightly': 'git-master',
      'latest': 'Latest',
      'v1.0': 'v1.0',
      'v1.1': 'v1.1',
    };
    var current_version = 'v1.1';
  
    function build_select(current_version, current_release) {
      var buf = ['<select class="version-select">'];
  
      $.each(all_versions, function(version, title) {
        buf.push('<option value="' + version + '"');
        if (version == current_version) {
          buf.push(' selected="selected">');
		  
		  if(version == 'latest') {
			buf.push(title + ' (' + current_release + ')')
		  } else {
            buf.push(title);
		  }
        } else {
          buf.push('>' + title);
        }
        buf.push('</option>');
      });
  
      buf.push('</select>');
      return buf.join('');
    }
  
    function patch_url(url, new_version) {
      return url.replace(url_re, 'docs.bsframework.io/' + new_version + '/');
    }
  
    function on_switch() {
      var selected = $(this).children('option:selected').attr('value');
  
      var url = window.location.href,
          new_url = patch_url(url, selected);
  
      if (new_url != url) {
        $.ajax({
          url: new_url,
          success: function() {
             window.location.href = new_url;
          },
          error: function() {
             window.location.href = 'http://docs.bsframework.io/' + selected;
          }
        });
      }
    }
  
    $(document).ready(function() {
      var match = url_re.exec(window.location.href);
      if (match) {
        var release = current_version;
        var version = match[1];
        var select = build_select(version, release);

        if(version[0] != 'v' || version == release)
            $('.outdated').hide();

        $('.version-select').html(select);
        $('.version-select select').bind('change', on_switch);
      }
    });
  })();
