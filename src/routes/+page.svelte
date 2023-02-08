<script>
	import humanize from 'humanize-plus'
	export let data
</script>

<h1 class="text-center text-xl font-bold mt-3">Find Your Next Job</h1>

<div class="overflow-x-auto w-full pl-9 pr-9">
	{#each data.jobs as job}
		<div class="flex flex-col mt-10">
			<div>
				<a class="font-bold text-2xl" href="/jobs/{job.id}">{job.title}</a>
				<div class="text-sm mt-1">
					{job.employer} . {job.location} .
					<span class="text-sm"
						>USD {humanize.formatNumber(job.minAnnualCompensation)} - USD {humanize.formatNumber(
							job.maxAnnualCompensation
						)}</span
					>
				</div>
				<div class="italic text-xs opacity-50 mt-2">
					posted {new Date(job.created).toLocaleDateString(undefined, {
						weekday: 'long',
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}
				</div>
			</div>

			<div class="mt-4 ">
				{job.description.slice(0, 240)}...
			</div>
		</div>
	{/each}
</div>
