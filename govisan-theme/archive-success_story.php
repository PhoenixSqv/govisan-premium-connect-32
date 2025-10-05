<?php get_header(); ?>
<main class="container success-stories">
  <header class="section-header">
    <h1>Historias de Éxito</h1>
    <p class="subtitle">Casos destacados por sector</p>
    <div class="filters">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="hospitality">Hospitality</button>
      <button class="filter-btn" data-filter="residential">Residential</button>
      <button class="filter-btn" data-filter="corporate">Corporate</button>
    </div>
  </header>

  <section class="stories-grid">
    <?php if (have_posts()): while (have_posts()): the_post();
      $terms = get_the_terms(get_the_ID(),'story_category');
      $classes = '';
      if ($terms && !is_wp_error($terms)) { foreach ($terms as $t) { $classes .= ' '.esc_attr($t->slug); } }
      $location = get_post_meta(get_the_ID(),'location', true);
    ?>
      <article id="post-<?php the_ID(); ?>" <?php post_class('story-item'.$classes); ?>>
        <a href="<?php the_permalink(); ?>" class="story-card">
          <div class="story-thumb">
            <?php if (has_post_thumbnail()) the_post_thumbnail('medium_large'); ?>
          </div>
          <div class="story-body">
            <p class="story-excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
            <h3 class="story-title"><?php the_title(); ?></h3>
            <?php if ($location): ?>
              <p class="story-location"><span class="dashicons dashicons-location"></span> <?php echo esc_html($location); ?></p>
            <?php endif; ?>
          </div>
        </a>
      </article>
    <?php endwhile; else: ?>
      <p>No hay historias publicadas aún.</p>
    <?php endif; ?>
  </section>
</main>
<?php get_footer(); ?>
