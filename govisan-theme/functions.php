<?php
/**
 * Govisan Theme Functions
 * 
 * @package Govisan
 */

// Define theme version
define( 'GOVISAN_VERSION', '1.0.0' );

/**
 * Theme Setup
 */
function govisan_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 1200, 675, true );

	// Add custom image sizes
	add_image_size( 'govisan-featured', 1920, 1080, true );
	add_image_size( 'govisan-medium', 800, 600, true );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'govisan' ),
		'footer'  => __( 'Footer Menu', 'govisan' ),
	) );

	// Switch default core markup to output valid HTML5.
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
		'style',
		'script',
	) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	// Add support for core custom logo.
	add_theme_support( 'custom-logo', array(
		'height'      => 60,
		'width'       => 200,
		'flex-width'  => true,
		'flex-height' => true,
	) );

	// Add support for editor styles.
	add_theme_support( 'editor-styles' );
	add_editor_style( 'style.css' );

	// Add support for responsive embedded content.
	add_theme_support( 'responsive-embeds' );
}
add_action( 'after_setup_theme', 'govisan_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 */
function govisan_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'govisan_content_width', 1200 );
}
add_action( 'after_setup_theme', 'govisan_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function govisan_scripts() {
	// Enqueue theme stylesheet
	wp_enqueue_style( 'govisan-style', get_stylesheet_uri(), array(), GOVISAN_VERSION );
	
	// Enqueue Google Fonts
	wp_enqueue_style( 'govisan-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', array(), null );

	// Enqueue theme scripts
	wp_enqueue_script( 'govisan-navigation', get_template_directory_uri() . '/js/navigation.js', array(), GOVISAN_VERSION, true );
	wp_enqueue_script( 'govisan-main', get_template_directory_uri() . '/js/main.js', array( 'jquery' ), GOVISAN_VERSION, true );

	// Add comment reply script
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'govisan_scripts' );

/**
 * Register widget areas.
 */
function govisan_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Sidebar', 'govisan' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Add widgets here to appear in your sidebar.', 'govisan' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 1', 'govisan' ),
		'id'            => 'footer-1',
		'description'   => __( 'Add widgets here to appear in your footer.', 'govisan' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 2', 'govisan' ),
		'id'            => 'footer-2',
		'description'   => __( 'Add widgets here to appear in your footer.', 'govisan' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );

	register_sidebar( array(
		'name'          => __( 'Footer 3', 'govisan' ),
		'id'            => 'footer-3',
		'description'   => __( 'Add widgets here to appear in your footer.', 'govisan' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'govisan_widgets_init' );

/**
 * Custom excerpt length
 */
function govisan_excerpt_length( $length ) {
	return 30;
}
add_filter( 'excerpt_length', 'govisan_excerpt_length' );

/**
 * Custom excerpt more
 */
function govisan_excerpt_more( $more ) {
	return '...';
}
add_filter( 'excerpt_more', 'govisan_excerpt_more' );

/**
 * Add custom body classes
 */
function govisan_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'govisan_body_classes' );
