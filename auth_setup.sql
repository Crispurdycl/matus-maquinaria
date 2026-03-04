-- Habilitar Row Level Security (RLS) en ambas tablas
ALTER TABLE public.vehiculos ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.mantenciones ENABLE ROW LEVEL SECURITY;

-- Políticas para 'vehiculos' (Solo usuarios autenticados pueden ver, crear, editar o eliminar)
CREATE POLICY "Permitir todo a usuarios autenticados en vehiculos" ON public.vehiculos FOR ALL TO authenticated USING (true)
WITH
    CHECK (true);

-- Políticas para 'mantenciones' (Solo usuarios autenticados pueden ver, crear, editar o eliminar)
CREATE POLICY "Permitir todo a usuarios autenticados en mantenciones" ON public.mantenciones FOR ALL TO authenticated USING (true)
WITH
    CHECK (true);

/*
INSTRUCCIONES FINALES PARA EL ADMINISTRADOR:

1. Ejecuta este script pulsando el botón "Run" en el SQL Editor de Supabase.
2. Esto bloqueará la base de datos para que los usuarios anónimos o atacantes de internet 
no puedan ver, modificar ni robar tu información. 
3. Ahora, para crear tu usuario de acceso:
- Ve a "Authentication" en el menú de la izquierda de Supabase.
- Haz clic en "Add User" -> "Create new user".
- Ingresa tu correo (por ejemplo: admin@matus.cl) y una contraseña segura.
- Desactiva "Auto Confirm User" si quieres, o déjalo activo. 
(Lo ideal es que el usuario quede confirmado automáticamente para entrar directo).
4. Ve a la aplicación (http://localhost:3000 o tu link de Netlify), e inicia sesión.
*/