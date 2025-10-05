<?php
function govisan_theme_setup() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('html5', ['search-form','gallery','caption','script','style']);
  register_nav_menus(['primary' => __('Menú principal','govisan')]);
}
add_action('after_setup_theme','govisan_theme_setup');

function govisan_enqueue_assets() {
  wp_enqueue_style('govisan-style', get_stylesheet_uri(), [], null);
  wp_enqueue_style('govisan-main', get_template_directory_uri().'/assets/css/main.css', [], null);
  wp_enqueue_script('govisan-filters', get_template_directory_uri().'/assets/js/filters.js', [], null, true);
  wp_enqueue_style('dashicons');
}
add_action('wp_enqueue_scripts','govisan_enqueue_assets');

function govisan_register_success_stories() {
  $labels = [
    'name' => 'Historias de Éxito',
    'singular_name' => 'Historia de Éxito',
    'menu_name' => 'Success Stories',
    'add_new' => 'Añadir nueva',
    'add_new_item' => 'Añadir nueva Historia',
    'edit_item' => 'Editar Historia',
    'new_item' => 'Nueva Historia',
    'view_item' => 'Ver Historia',
    'search_items' => 'Buscar Historias',
    'not_found' => 'No se encontraron historias',
    'not_found_in_trash' => 'No hay historias en la papelera'
  ];
  $args = [
    'labels' => $labels,
    'public' => true,
    'has_archive' => true,
    'rewrite' => ['slug' => 'success-stories'],
    'menu_icon' => 'dashicons-portfolio',
    'supports' => ['title','editor','excerpt','thumbnail','revisions','custom-fields']
  ];
  register_post_type('success_story', $args);
}
add_action('init','govisan_register_success_stories');

function govisan_register_story_taxonomy() {
  $labels = [
    'name' => 'Categorías de Historias',
    'singular_name' => 'Categoría de Historia',
    'search_items' => 'Buscar Categorías',
    'all_items' => 'Todas las Categorías',
    'edit_item' => 'Editar Categoría',
    'update_item' => 'Actualizar Categoría',
    'add_new_item' => 'Añadir nueva Categoría',
    'new_item_name' => 'Nueva Categoría'
  ];
  $args = [
    'labels' => $labels,
    'hierarchical' => true,
    'show_admin_column' => true,
    'rewrite' => ['slug' => 'success-stories']
  ];
  register_taxonomy('story_category', 'success_story', $args);
}
add_action('init','govisan_register_story_taxonomy');
