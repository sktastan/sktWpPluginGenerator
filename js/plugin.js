function pluginStr(name, name_singular, description, text_domain) {

var customPostString = `
//-------------------------------------------------------------------------------//
// 					   Admin enqueue scripts (for media)                
//-------------------------------------------------------------------------------//
function `+ name_singular +`_admin_scripts(){
    if (is_admin ())
		wp_enqueue_media ();
		
	/* ======== Css Section Start ======== */
		wp_enqueue_style('`+ name_singular +`_css', plugin_dir_url( __FILE__ ) . 'css/style.css', array(), '1.0.0');		
	/* ======== Css Section Finish ======== */

	/* ======== JS/JQuery Section Start ======== */
		wp_enqueue_script('jquery');
		wp_enqueue_script('`+ name_singular +`_js', plugin_dir_url( __FILE__ ) . 'js/script.js', array(), '1.0.0', true);	
			
	/* ======== JS/JQuery Section Finish ======== */

}
add_action ('admin_enqueue_scripts', '`+ name_singular +`_admin_scripts');

//-------------------------------------------------------------------------------//
// 					   Register Custom Post Type `+ name_singular +`                    
//-------------------------------------------------------------------------------//
function create_`+ name_singular +`_cpt() {

    $labels = array(
        'name' => _x('` + name + `', 'Post Type General Name', '` + text_domain + `'),
        'singular_name' => _x('`+ name_singular +`', 'Post Type Singular Name', '` + text_domain + `'),
        'menu_name' => _x('` + name + `', 'Admin Menu text', '` + text_domain + `'),
        'name_admin_bar' => _x('`+ name_singular +`', 'Add New on Toolbar', '` + text_domain + `'),
        'archives' => __('`+ name_singular +` Archives', '` + text_domain + `'),
        'attributes' => __('`+ name_singular +` Attributes', '` + text_domain + `'),
        'parent_item_colon' => __('Parent `+ name_singular +`:', '` + text_domain + `'),
        'all_items' => __('All ` + name + `', '` + text_domain + `'),
        'add_new_item' => __('Add New `+ name_singular +`', '` + text_domain + `'),
        'add_new' => __('Add New', '` + text_domain + `'),
        'new_item' => __('New `+ name_singular +`', '` + text_domain + `'),
        'edit_item' => __('Edit `+ name_singular +`', '` + text_domain + `'),
        'update_item' => __('Update `+ name_singular +`', '` + text_domain + `'),
        'view_item' => __('View `+ name_singular +`', '` + text_domain + `'),
        'view_items' => __('View ` + name + `', '` + text_domain + `'),
        'search_items' => __('Search `+ name_singular +`', '` + text_domain + `'),
        'not_found' => __('Not found', '` + text_domain + `'),
        'not_found_in_trash' => __('Not found in Trash', '` + text_domain + `'),
        'featured_image' => __('Featured Image', '` + text_domain + `'),
        'set_featured_image' => __('Set featured image', '` + text_domain + `'),
        'remove_featured_image' => __('Remove featured image', '` + text_domain + `'),
        'use_featured_image' => __('Use as featured image', '` + text_domain + `'),
        'insert_into_item' => __('Insert into `+ name_singular +`', '` + text_domain + `'),
        'uploaded_to_this_item' => __('Uploaded to this `+ name_singular +`', '` + text_domain + `'),
        'items_list' => __('` + name + ` list', '` + text_domain + `'),
        'items_list_navigation' => __('` + name + ` list navigation', '` + text_domain + `'),
        'filter_items_list' => __('Filter ` + name + ` list', '` + text_domain + `'),
    );
    $args = array(
        'label' => __('`+ name_singular +`', '` + text_domain + `'),
        'description' => __('` + description + `', '` + text_domain + `'),
        'labels' => $labels,
        'menu_icon' => 'dashicons-admin-plugins',
        'supports' => array(),
        'taxonomies' => array(),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => true,
        'hierarchical' => false,
        'exclude_from_search' => false,
        'show_in_rest' => true,
        'publicly_queryable' => true,
        'capability_type' => 'post',
    );
    register_post_type('`+ name_singular +`', $args);

}
add_action('init', 'create_`+ name_singular +`_cpt', 0);

//-------------------------------------------------------------------------------//
// 								Custom meta boxes              
//-------------------------------------------------------------------------------//
class `+ name_singular +`_Meta_Box {
	private $screens = array(
        'post',
        'page',
        '`+ name_singular +`'
	);
	private $fields = array(
        ` + elementList.join("") + `
	);

	/**
	 * Class construct method. Adds actions to their respective WordPress hooks.
	 */
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes' ) );
		add_action( 'admin_footer', array( $this, 'admin_footer' ) );
		add_action( 'save_post', array( $this, 'save_post' ) );
	}

	/**
	 * Hooks into WordPress' add_meta_boxes function.
	 * Goes through screens (post types) and adds the meta box.
	 */
	public function add_meta_boxes() {
		foreach ( $this->screens as $screen ) {
			add_meta_box(
				//'advanced-options',
				'`+name_singular+`-options',
				__( '`+name_singular+` Options', '`+ text_domain +`' ),
				
				//__( 'Advanced Options', '`+ name_singular +`-metabox' ),
				//__( '`+name_singular+`', '`+text_domain+`' ),
				array( $this, 'add_meta_box_callback' ),
				$screen,
				'advanced',
				'default'
			);
		}
	}

	/**
	 * Generates the HTML for the meta box
	 * 
	 * @param object $post WordPress post object
	 */
	public function add_meta_box_callback( $post ) {
		wp_nonce_field( 'advanced_options_data', 'advanced_options_nonce' );
		$this->generate_fields( $post );
	}

	/**
	 * Hooks into WordPress' admin_footer function.
	 * Adds scripts for media uploader.
	 */
	public function admin_footer() {
		?><script>
			// https://codestag.com/how-to-use-wordpress-3-5-media-uploader-in-theme-options/
			jQuery(document).ready(function($){
				if ( typeof wp.media !== 'undefined' ) {
					var _custom_media = true,
					_orig_send_attachment = wp.media.editor.send.attachment;
					$('.`+ name_singular +`-metabox-media').click(function(e) {
						var send_attachment_bkp = wp.media.editor.send.attachment;
						var button = $(this);
						var id = button.attr('id').replace('_button', '');
						_custom_media = true;
							wp.media.editor.send.attachment = function(props, attachment){
							if ( _custom_media ) {
								$("#"+id).val(attachment.url);
							} else {
								return _orig_send_attachment.apply( this, [props, attachment] );
							};
						}
						wp.media.editor.open(button);
						return false;
					});
					$('.add_media').on('click', function(){
						_custom_media = false;
					});
				}
				$("#metaBoxTabs").tabs();
			});			
		</script><?php
	}

	/**
	 * Generates the field's HTML for the meta box.
	 */
	public function generate_fields( $post ) {
		$output = '';
		$tab_count = 5;
		foreach ( $this->fields as $field ) {
			$label = '<label for="' . $field['id'] . '">' . $field['label'] . '</label>';
			$db_value = get_post_meta( $post->ID, $field['id'], true );
			switch ( $field['type'] ) {
				// case 'tab':
				// 	$input = sprintf(
				// 		'<div class="" id="%s"><ul><li><a href="#tabs-1">Mexa box tab1</a></li><li><a href="#tabs-2">Mexa box tab1</a></li></ul></div>',
				// 		$field['id'],						
				// 		$db_value
				// 	);
				// 	break;
				case 'checkbox':
					$input = sprintf(
						'<input %s id="%s" name="%s" type="checkbox" value="1"> %s',
						$db_value === '1' ? 'checked' : '',
						$field['id'],
						$field['id'],
						$field['description']
					);
					break;
				case 'media':
					$input = sprintf(
						'<input class="regular-text" id="%s" name="%s" type="text" value="%s"> <input class="button `+ name_singular +`-metabox-media" id="%s_button" name="%s_button" type="button" value="Upload" /> %s',
						$field['id'],
						$field['id'],
						$db_value,
						$field['id'],
						$field['id'],
						$field['description']
					);
					break;
				case 'radio':
					$input = '<fieldset>';
					$input .= '<legend class="screen-reader-text">' . $field['label'] . '</legend>';
					$i = 0;
					foreach ( $field['options'] as $key => $value ) {
						$field_value = !is_numeric( $key ) ? $key : $value;
						$input .= sprintf(
							'<label><input %s id="%s" name="%s" type="radio" value="%s"> %s</label>%s',
							$db_value === $field_value ? 'checked' : '',
							$field['id'],
							$field['id'],
							$field_value,
							$value,
							$i < count( $field['options'] ) - 1 ? '<br>' : ''
						);
						$i++;
					}
					$input .= '</fieldset>';
					break;
				case 'select':
					$input = sprintf(
						'<select id="%s" name="%s">',
						$field['id'],
						$field['id']					
					);
					foreach ( $field['options'] as $key => $value ) {
						$field_value = !is_numeric( $key ) ? $key : $value;
						$input .= sprintf(
							'<option %s value="%s">%s</option>',
							$db_value === $field_value ? 'selected' : '',
							$field_value,
							$value	
						);
					}
					$input .= '</select><p style="display:inline; margin-left:30px">' . $field["description"] . '</p>';
					break;
				case 'textarea':
					$input = sprintf(
						'<textarea class="large-text" id="%s" name="%s" rows="5">%s</textarea> %s',
						$field['id'],
						$field['id'],
						$db_value,
						$field['description']
					);
					break;
				default:
					$input = sprintf(
						'<input %s id="%s" name="%s" type="%s" value="%s"> %s',
						$field['type'] !== 'color' ? 'class="regular-text"' : '',
						$field['id'],
						$field['id'],
						$field['type'],
						$db_value,
						$field['description']
						//$field['tab_number']
					);
			}

			$output .= $this->row_format( $label, $input );
		
		}

		echo '<table class="form-table"><tbody>' . $output . '</tbody></table>';	
	}

	/**
	 * Generates the HTML for table rows.
	 */
	public function row_format( $label, $input ) {
		return sprintf(
			'<tr><th scope="row">%s</th><td>%s</td></tr>',
			$label,
			$input
		);
	}
	/**
	 * Hooks into WordPress' save_post function
	 */
	public function save_post( $post_id ) {
		if ( ! isset( $_POST['advanced_options_nonce'] ) )
			return $post_id;

		$nonce = $_POST['advanced_options_nonce'];
		if ( !wp_verify_nonce( $nonce, 'advanced_options_data' ) )
			return $post_id;

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
			return $post_id;

		foreach ( $this->fields as $field ) {
			if ( isset( $_POST[ $field['id'] ] ) ) {
				switch ( $field['type'] ) {
					case 'email':
						$_POST[ $field['id'] ] = sanitize_email( $_POST[ $field['id'] ] );
						break;
					case 'text':
						$_POST[ $field['id'] ] = sanitize_text_field( $_POST[ $field['id'] ] );
						break;
				}
				update_post_meta( $post_id, $field['id'], $_POST[ $field['id'] ] );
			} else if ( $field['type'] === 'checkbox' ) {
				update_post_meta( $post_id, $field['id'], '0' );
			}
		}
	}
}
new `+ name_singular +`_Meta_Box;

//-------------------------------------------------------------------------------//
// 					   Short code `+ name_singular +`                    
//-------------------------------------------------------------------------------//
function create_`+ name_singular +`_shortcode($atts) {
        
    // Attributes
    $atts = shortcode_atts(
    array(
        'id' => 'id`+ name_singular +`',
    ),

    $atts,
    '`+ name_singular +`ShortCode'
    );

    // Attributes in var
    $id = $atts['id'];

    global $post;
    // global $prefix ;

    // Query Arguments
    $args = array(
        'post_type' => array('`+ name_singular +`'),
        'nopaging' => true,
        'order' => 'ASC'
    );

    // The Query
    $`+ name_singular +`Query = new WP_Query( $args );

    // The Loop
    if ( $`+ name_singular +`Query->have_posts() ) {
        while ( $`+ name_singular +`Query->have_posts() ) {
            $`+ name_singular +`Query->the_post();

            ` + shortcodeArr.join("") +` 

            $output .= '';
        }
    } else {
        // no posts found
        $output .='<p style=\u0022border: 1px solid #e1e1e1;margin:20px;padding:30px;font-size:200%; text-align:center; color:orange\u0022>There are no posts</p>';
    }

    /* Restore original Post Data */
    wp_reset_postdata();

    return $output;
}
add_shortcode( '`+ name_singular +`ShortCode', 'create_`+ name_singular +`_shortcode' );

`;

return customPostString;
}
