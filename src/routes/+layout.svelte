<script>
  import '../app.css';
  import Nav from '../components/common/nav.svelte'
  import Alert from '../components/common/alerts.svelte'
	import { alerts } from '../utils/alert';

  $alerts
</script>

<Nav />

<div class="container mx-auto">
  <Alert />
  <slot />
</div>

<div class="mt-28" />