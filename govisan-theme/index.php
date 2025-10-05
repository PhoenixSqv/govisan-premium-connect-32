<?php
/**
 * The main template file
 * 
 * @package Govisan
 */

get_header(); ?>

<main id="main" class="site-main">
	
	<?php if ( have_posts() ) : ?>

		<?php if ( is_home() && ! is_front_page() ) : ?>
			<header class="page-header">
				<h1 class="page-title screen-reader-text"><?php single_post_title(); ?></h1>
			</header>
		<?php endif; ?>

		<div class="posts-container">
			<?php
			// Start the Loop.
			while ( have_posts() ) :
				the_post();
				?>
				
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<header class="entry-header">
						<?php
						if ( is_singular() ) :
							the_title( '<h1 class="entry-title">', '</h1>' );
						else :
							the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
						endif;
						?>
					</header>

					<?php if ( has_post_thumbnail() ) : ?>
						<div class="post-thumbnail">
							<?php the_post_thumbnail( 'large' ); ?>
						</div>
					<?php endif; ?>

					<div class="entry-content">
						<?php
						if ( is_singular() ) :
							the_content();
						else :
							the_excerpt();
						endif;
						?>
					</div>

					<footer class="entry-footer">
						<span class="posted-on"><?php echo get_the_date(); ?></span>
						<span class="byline"> by <?php the_author(); ?></span>
					</footer>
				</article>

			<?php endwhile; ?>

			<?php
			// Previous/next page navigation.
			the_posts_pagination( array(
				'mid_size'  => 2,
				'prev_text' => __( 'Previous', 'govisan' ),
				'next_text' => __( 'Next', 'govisan' ),
			) );
			?>
		</div>

	<?php else : ?>

		<section class="no-results not-found">
			<header class="page-header">
				<h1 class="page-title"><?php _e( 'Nothing Found', 'govisan' ); ?></h1>
			</header>

			<div class="page-content">
				<p><?php _e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'govisan' ); ?></p>
				<?php get_search_form(); ?>
			</div>
		</section>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
