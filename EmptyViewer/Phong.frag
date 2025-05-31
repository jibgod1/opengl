#version 330 core
out vec4 FragColor;

in vec3 FragPos;
in vec3 Normal;

uniform vec3 lightPos;
uniform vec3 viewPos;

const vec3 ka = vec3(0.0, 1.0, 0.0);
const vec3 kd = vec3(0.0, 0.5, 0.0);
const vec3 ks = vec3(0.5, 0.5, 0.5);
const float p = 32.0;
const float Ia = 0.2;
const float gamma = 2.2;

void main()
{
    vec3 N = normalize(Normal);
    vec3 L = normalize(lightPos - FragPos);
    vec3 V = normalize(viewPos - FragPos);
    vec3 R = reflect(-L, N);

    vec3 ambient = Ia * ka;

    float diff = max(dot(N, L), 0.0);
    vec3 diffuse = diff * kd;

    float spec = 0.0;
    if(diff > 0.0)
        spec = pow(max(dot(R, V), 0.0), p);
    vec3 specular = spec * ks;

    vec3 color = ambient + diffuse + specular;
    color = pow(color, vec3(1.0 / gamma));

    FragColor = vec4(color, 1.0);
}