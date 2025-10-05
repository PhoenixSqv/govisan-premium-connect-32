<?php
/**
 * The template for displaying all single posts
 * 
 * @package Govisan
 */

get_header(); ?>

<main id="main" class="site-main">

	<?php
	while ( have_posts() ) :
		the_post();
		?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			
			<header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>

				<div class="entry-meta">
					<span class="posted-on">
						<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
							<?php echo get_the_date(); ?>
						</time>
					</span>
					<span class="byline">
						<?php _e( 'by', 'govisan' ); ?> 
						<span class="author"><?php the_author(); ?></span>
					</span>
					<?php if ( has_category() ) : ?>
						<span class="categories">
							<?php the_category( ', ' ); ?>
						</span>
					<?php endif; ?>
				</div>
			</header>

			<?php if ( has_post_thumbnail() ) : ?>
				<div class="post-thumbnail">
					<?php the_post_thumbnail( 'govisan-featured' ); ?>
				</div>
			<?php endif; ?>

			<div class="entry-content">
				<?php
				the_content();

				wp_link_pages( array(
					'before' => '<div class="page-links">' . __( 'Pages:', 'govisan' ),
					'after'  => '</div>',
				) );
				?>
			</div>

			<?php if ( has_tag() ) : ?>
				<footer class="entry-footer">
					<div class="tags">
						<?php the_tags( '<span class="tags-label">' . __( 'Tags:', 'govisan' ) . '</span> ', ', ' ); ?>
					</div>
				</footer>
			<?php endif; ?>

		</article>

		<?php
		// Previous/next post navigation.
		the_post_navigation( array(
			'prev_text' => '<span class="nav-subtitle">' . __( 'Previous:', 'govisan' ) . '</span> <span class="nav-title">%title</span>',
			'next_text' => '<span class="nav-subtitle">' . __( 'Next:', 'govisan' ) . '</span> <span class="nav-title">%title</span>',
		) );

		// If comments are open or there is at least one comment, load the comment template.
		if ( comments_open() || get_comments_number() ) :
			comments_template();
		endif;

	endwhile;
	?>

</main>

<?php get_footer(); ?>
