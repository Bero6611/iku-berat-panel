IKU – Berat Panel Plugin

Custom Grafana panel plugin developed as part of Istanbul Kültür University Grafana Plugin Project.

This plugin visualizes numeric data inside a dynamic SVG circle, where the color changes based on value thresholds.
It provides a simple, clean and configurable visualization component.

Project Purpose

The aim of this project is to develop a custom Grafana panel plugin using:

React

TypeScript

Grafana Plugin SDK

The plugin allows users to:

✔ Display real-time numeric values
✔ Automatically color the circle based on value
✔ Customize panel background
✔ Add text information
✔ Enable centered layout

 Features

Dynamic SVG Circle Visualization

Value displayed inside the circle

Threshold-based color states:

Value	Color
< 50	Green
50 – 80	Orange
> 80	Red

Customizable options:

Background color

Text value

Text size

Center text mode

Compatible with time-series data

Works with Random Walk test data

Built fully with React + TypeScript

 Bonus Features Implemented

✔ Custom panel options menu
✔ Dynamic SVG rendering
✔ Real-time field value mapping
✔ Panel author signature
✔ Optional series counter
✔ Panel description footer
✔ Works without data source (fallback mode)

These features extend default panel behavior

 Screenshots

Panel View
(buraya panel ekran görüntüsünü ekleyeceğiz)

Options Panel
(options screenshot eklenebilir)

 Installation & Build

Install dependencies

npm install


Development mode

npm run dev


Production build

npm run build


Copy plugin to Grafana plugins folder

/var/lib/grafana/plugins/


Enable unsigned plugins

allow_loading_unsigned_plugins = iku-berat-panel


Restart Grafana

systemctl restart grafana-server
