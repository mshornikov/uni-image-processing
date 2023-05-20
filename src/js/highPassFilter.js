export const highPassFilter = (imageData) => {
	// Создаем временный холст для работы с изображением
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	const filterMatrix = [
		-1, -1, -1,
		-1, 9, -1,
		-1, -1, -1
	  ];
	// Задаем размеры временного холста равными размерам изображения
	canvas.width = imageData.width;
	canvas.height = imageData.height;
  
	// Копируем данные изображения на временный холст
	context.putImageData(imageData, 0, 0);
  
	// Получаем пиксели изображения
	var pixels = context.getImageData(0, 0, canvas.width, canvas.height);
  
	// Создаем временный массив для хранения результатов фильтрации
	var tempPixels = new Uint8ClampedArray(pixels.data.length);
  
	// Применяем высокочастотный фильтр к каждому пикселю
	for (var y = 0; y < pixels.height; y++) {
	  for (var x = 0; x < pixels.width; x++) {
		var i = (y * 4) * pixels.width + x * 4;
		var r = 0;
		var g = 0;
		var b = 0;
  
		// Проходим по окрестности пикселя с матрицей фильтра
		for (var fy = -1; fy <= 1; fy++) {
		  for (var fx = -1; fx <= 1; fx++) {
			var nx = x + fx;
			var ny = y + fy;
  
			// Проверяем, находятся ли координаты в пределах изображения
			if (nx >= 0 && nx < pixels.width && ny >= 0 && ny < pixels.height) {
			  var ni = (ny * 4) * pixels.width + nx * 4;
			  var filterValue = filterMatrix[(fy + 1) * 3 + (fx + 1)];
  
			  r += pixels.data[ni] * filterValue;
			  g += pixels.data[ni + 1] * filterValue;
			  b += pixels.data[ni + 2] * filterValue;
			}
		  }
		}
  
		// Задаем новые значения цветов пикселя
		tempPixels[i] = r;
		tempPixels[i + 1] = g;
		tempPixels[i + 2] = b;
		tempPixels[i + 3] = pixels.data[i + 3]; // Альфа-канал
	  }
	}
  
	// Копируем измененные пиксели обратно на изображение
	pixels.data.set(tempPixels);
	context.putImageData(pixels, 0, 0);
  
	// Возвращаем обработанное изображение
	return context.getImageData(0, 0, canvas.width, canvas.height);
  }