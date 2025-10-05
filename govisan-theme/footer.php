<?php
/**
 * The footer for the theme
 * 
 * @package Govisan
 */
?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="footer-container">
			<?php if ( is_active_sidebar( 'footer-1' ) || is_active_sidebar( 'footer-2' ) || is_active_sidebar( 'footer-3' ) ) : ?>
				<div class="footer-widgets">
					<div class="footer-widget-area">
						<?php dynamic_sidebar( 'footer-1' ); ?>
					</div>
					<div class="footer-widget-area">
						<?php dynamic_sidebar( 'footer-2' ); ?>
					</div>
					<div class="footer-widget-area">
						<?php dynamic_sidebar( 'footer-3' ); ?>
					</div>
				</div>
			<?php endif; ?>

			<div class="footer-bottom">
				<div class="site-info">
					<p>&copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. <?php _e( 'All rights reserved.', 'govisan' ); ?></p>
					<?php
					wp_nav_menu( array(
						'theme_location' => 'footer',
						'menu_id'        => 'footer-menu',
						'depth'          => 1,
						'fallback_cb'    => false,
					) );
					?>
				</div>
			</div>
		</div>
	</footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
