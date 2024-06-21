<script setup lang="ts">

</script>

<template>
  <div class="e-section__header">
    <div class="e-section__title">Finalize</div>
  <div class="e-section__actions">
    <button class="e-btn e-btn-primary">Upload locations</button>
  </div>
  </div>
  <div class="e-section__content">
    <table class="e-table e-table-verticalcentered" data-e-version="2">
      <tbody>
      <tr class="e-table__row">
        <td class="e-table__col">
          <e-icon icon="error" color="red"/>
        </td>
        <td class="e-table__col e-table__col-nowrap">
          <div class="text-lineheight">
            <b class="text-color-error">
              Your currently added or imported locations contain [some number here] invalid ones. Upload WILL filter out invalid locations.
            </b>
            <p class="text-color-error">You can check, fix or remove these invalid locations in the previous step.</p>
          </div>
        </td>
      </tr>
      <tr class="e-table__row">
        <td class="e-table__col">
          <e-icon icon="checkmark" color="green"/>
        </td>
        <td class="e-table__col e-table__col-nowrap">
          <div class="text-lineheight">
            <b class="text-color-success">
              Your currently uploaded, added or edited locations contain only valid data.
            </b>
          </div>
        </td>
      </tr>
      <tr class="e-table__row">
        <td class="e-table__col e-table__col-auto">
          <e-icon icon="checkmark" color="green"/>
        </td>
        <td>
          <div class="text-lineheight">
            <b class="text-color-success">
              Your currently uploaded, added or edited locations consist of 42  valid locations.
            </b>
          </div>
        </td>
      </tr>
      <tr class="e-table__row">
        <td class="e-table__col e-table__col-auto">
          <e-icon icon="copy" color="info"/>
        </td>
        <td>
          <div class="text-lineheight">
            <b class="text-color-info">
              You can export your your currently uploaded, added or edited locations in CSV by clicking this button. The exported data WILL contain ALL locations. Yes, the invalid ones too.
            </b>
          </div>
          <button class="e-btn e-btn-large e-margin-top-m">Click this here button to export</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>