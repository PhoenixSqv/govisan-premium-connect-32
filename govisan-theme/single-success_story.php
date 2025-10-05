<?php get_header(); ?>
<main class="container story-single">
  <?php if (have_posts()): while (have_posts()): the_post();
    $location = get_post_meta(get_the_ID(),'location', true);
  ?>
    <article <?php post_class(); ?>>
      <h1><?php the_title(); ?></h1>
      <?php if ($location): ?>
        <p class="story-location"><span class="dashicons dashicons-location"></span> <?php echo esc_html($location); ?></p>
      <?php endif; ?>
      <?php if (has_post_thumbnail()) the_post_thumbnail('large'); ?>
      <div class="story-content"><?php the_content(); ?></div>
    </article>
  <?php endwhile; endif; ?>
</main>
<?php get_footer(); ?>
