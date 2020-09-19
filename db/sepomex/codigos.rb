require 'csv'


# ZIP_CODES = CSV.read(File.join(__dir__, 'SoloCodigosPostalesPorEstado.csv'))

%w(AGU BCN BCS CAM CHH CHP CMX COA COL DUR GRO GUA HID JAL MEX MIC MOR NAY NLE OAX PUE QUE ROO SIN SLP SON TAB TAM TLA VER YUC ZAC).each do | abbr |
  state = Spree::State.find_by!(abbr: abbr)
  Spree::ZipCode.where(abbr: abbr).update_all(state: state.id)
  puts abbr
end
