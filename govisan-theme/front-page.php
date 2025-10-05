<?php
/**
 * The template for displaying the front page
 * 
 * @package Govisan
 */

get_header(); ?>

<main id="main" class="site-main front-page">

	<?php
	// Hero Section
	if ( have_posts() ) :
		while ( have_posts() ) :
			the_post();
			?>
			
			<section class="hero-section">
				<div class="hero-container">
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="hero-image">
							<?php the_post_thumbnail( 'govisan-featured' ); ?>
						</div>
					<?php endif; ?>
					
					<div class="hero-content">
						<h1 class="hero-title"><?php the_title(); ?></h1>
						<div class="hero-description">
							<?php the_content(); ?>
						</div>
					</div>
				</div>
			</section>

		<?php endwhile; ?>
	<?php endif; ?>

	<?php
	// Custom sections can be added here using ACF fields or custom meta boxes
	// Example: About Section, Solutions Section, etc.
	?>

	<?php
	// Recent Posts Section
	$recent_posts = new WP_Query( array(
		'posts_per_page' => 3,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
	) );

	if ( $recent_posts->have_posts() ) :
		?>
		<section class="recent-posts-section">
			<div class="section-container">
				<h2 class="section-title"><?php _e( 'Latest Insights', 'govisan' ); ?></h2>
				<div class="posts-grid">
					<?php
					while ( $recent_posts->have_posts() ) :
						$recent_posts->the_post();
						?>
						<article class="post-card">
							<?php if ( has_post_thumbnail() ) : ?>
								<div class="post-thumbnail">
									<a href="<?php the_permalink(); ?>">
										<?php the_post_thumbnail( 'govisan-medium' ); ?>
									</a>
								</div>
							<?php endif; ?>
							
							<div class="post-content">
								<h3 class="post-title">
									<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
								</h3>
								<div class="post-meta">
									<span class="post-date"><?php echo get_the_date(); ?></span>
								</div>
								<div class="post-excerpt">
									<?php the_excerpt(); ?>
								</div>
								<a href="<?php the_permalink(); ?>" class="read-more">
									<?php _e( 'Read More', 'govisan' ); ?> →
								</a>
							</div>
						</article>
					<?php endwhile; ?>
					<?php wp_reset_postdata(); ?>
				</div>
			</div>
		</section>
	<?php endif; ?>

</main>

<?php get_footer(); ?>
